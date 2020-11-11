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

import {
  SensorsQuery,
  useSensorsQuery
} from "../../../../graphql/generated/graphql";
import { getSensorAddress } from "../../../GoogleApi/useSensorGeocoding";
import { GOOGLE_API_KEY } from "../../../GoogleApi/const";
import { OptionType, PlaceType } from "../../../../store/SearchData/model";

const remappedSensorOption: (data: SensorsQuery) => PlaceType[] = data =>
  data?.sensors.map(option => ({
    description: getSensorAddress(option),
    type: OptionType.sensor,
    structured_formatting: {
      main_text: getSensorAddress(option),
      secondary_text: option.code,
      main_text_matched_substrings: [{ offset: 0, length: 0 }]
    },
    ...option
  }));

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService: any = { current: null };

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2)
  }
}));

interface AutocompleteProps {
  value: PlaceType[];
  setValue: (p: PlaceType[]) => void;
  className?: string;
}

/*
 * TODO: refactor + error handling
 * */
export const Autocomplete = ({
  value,
  setValue,
  className
}: AutocompleteProps) => {
  const { data, error, loading } = useSensorsQuery();

  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

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
      setOptions(remappedSensorOption(data));
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        let newOptions = [] as PlaceType[];

        if (value.length > 0) {
          newOptions = value;
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(
          newOptions
            .map(o => ({ type: OptionType.location, ...o }))
            .concat(remappedSensorOption(data))
        );
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  useEffect(() => {
    if (data) {
      setOptions(prevState => prevState.concat(remappedSensorOption(data)));
    }
  }, [data]);

  return options ? (
    <MAutocomplete
      className={className}
      id="grouped-demo"
      options={options}
      multiple={true}
      groupBy={option => option.type}
      getOptionLabel={option => option?.description || ""}
      getOptionDisabled={option => !!value.find(v => v.id === option.id)}
      onChange={(event: any, newValue: PlaceType | null | any) => {
        setValue(newValue);
      }}
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
        value.map((option, index: number) => (
          <Chip
            variant="outlined"
            color={index % 2 ? "primary" : "secondary"}
            label={option.code || option.structured_formatting.main_text}
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
