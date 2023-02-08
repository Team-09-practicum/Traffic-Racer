import { useEffect, useState } from 'react';
import { createApiDef } from '@/utils/api/createApiDef';

interface IGeolocationPositionError {
  readonly code: number;
  readonly message: string;
}

interface IGeolocationState {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  error?: Error | IGeolocationPositionError;
}

interface IGeolocationCoordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

interface IGeolocationPosition {
  readonly coords: IGeolocationCoordinates;
  readonly timestamp: number;
}

interface IGeocodeLatLng {
  (lat: number, lon: number): Promise<string | null>;
}

interface IDadataGeolocateSuggestionDTO {
  value: string;
  unrestricted_value: string;
  data: {
    city: string;
  };
}

interface IDadataGeolocateDTO {
  suggestions: IDadataGeolocateSuggestionDTO[];
}

const useGeolocation = (): IGeolocationState => {
  const [state, setState] = useState<IGeolocationState>({
    latitude: null,
    longitude: null,
    city: null,
  });

  const geocodeLatLng: IGeocodeLatLng = async (lat, lon) => {
    const token = '47946fcc58019ff6bc2ed32ca8008dd7e707ab55';
    const postReverseGeocoding = createApiDef<IDadataGeolocateDTO>({
      url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
      type: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
      withCredentials: false,
    });

    const res = await postReverseGeocoding({
      data: { lat, lon, count: 1 },
    });

    return res ? res.suggestions[0].data.city : null;
  };

  const onEvent = async (event: IGeolocationPosition) => {
    let city: string | null = null;
    try {
      city = await geocodeLatLng(event.coords.latitude, event.coords.longitude);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Reverse geocoding failed');
      city = 'Mocква';
    } finally {
      setState({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        city,
      });
    }
  };
  const onEventError = (error: IGeolocationPositionError) => {
    setState((oldState) => ({ ...oldState, error }));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onEventError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};

export default useGeolocation;
