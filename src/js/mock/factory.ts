import { isDevMode } from '@angular/core';

export const mockFactory = (module) => {
  if (isDevMode()) {
    return System.import(`app/mock/${module}`)
      .then((mock) => {
        return mock.default;
      });
  }

  return Promise.reject(false);
};

export default mockFactory;
