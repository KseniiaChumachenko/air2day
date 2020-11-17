import React, { useEffect, useMemo } from "react";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import {
  Chip,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  makeStyles
} from "@material-ui/core";
import { Autocomplete as MAutocomplete } from "@material-ui/lab";
import {
  LocationOnRounded,
  MemoryRounded,
  SearchRounded
} from "@material-ui/icons";
import { Trans } from "@lingui/macro";

import { PlaceType } from "../../../../store/SearchDataProvider/model";
import { OptionType } from "src/store/SearchDataProvider/constants";
import { useUpdateSearchData } from "../../../../store/SearchDataProvider";

const autocompleteService: any = { current: null };

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2)
  }
}));

interface AutocompleteProps {
  className?: string;
}

/*
 * TODO: geocoding for selected location
 * */
export const Autocomplete = ({ className }: AutocompleteProps) => {
  const classes = useStyles();
  const { searchData, setLocations } = useUpdateSearchData();

  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<PlaceType[]>([]);

  const { sensors, locations } = useMemo(() => searchData, [searchData]);

  const fetch = useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        200
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(sensors);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        let newOptions = [] as PlaceType[];

        if (locations.length > 0) {
          newOptions = locations;
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(
          newOptions
            .map(o => ({ type: OptionType.location, ...o }))
            .concat(sensors)
        );
      }
    });

    return () => {
      active = false;
    };
  }, [locations, inputValue, fetch]);

  useEffect(() => {
    if (sensors) {
      setOptions(prevState => prevState.concat(sensors));
    }
  }, [sensors]);

  return options ? (
    <MAutocomplete
      className={className}
      id="grouped-demo"
      options={options}
      multiple={true}
      value={locations}
      groupBy={option => option.type}
      getOptionLabel={option => option?.description || ""}
      getOptionDisabled={option => !!locations.find(v => v.id === option.id)}
      onChange={(event: any, newValue: PlaceType[] | null | any) =>
        setLocations(newValue)
      }
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          InputProps={{
            endAdornment: (
              <InputAdornment position={"end"}>
                <IconButton>
                  <SearchRounded />
                </IconButton>
              </InputAdornment>
            ),
            ...params.InputProps
          }}
          label={<Trans>Select sensor or enter location</Trans>}
          variant="outlined"
          fullWidth={true}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            color={index % 2 ? "primary" : "secondary"}
            label={option.code || option.structured_formatting?.main_text}
            {...getTagProps({ index })}
          />
        ))
      }
      renderOption={option => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length
          ])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              {option.type === OptionType.sensor ? (
                <MemoryRounded className={classes.icon} />
              ) : (
                <LocationOnRounded className={classes.icon} />
              )}
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  ) : (
    <div />
  );
};
