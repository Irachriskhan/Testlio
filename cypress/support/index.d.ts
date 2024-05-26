/// <reference types="cypress" />

// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     typeLoginDta(email: string, password: string): void;
//   }
// }

import type week5inputs from "../fixtures/week5.json";

interface FixtureTypes {
  week5inputs: typeof week5inputs;
  // add other fixtures here
}

declare global {
  namespace Cypress {
    interface Chainable {
      fixture<K extends keyof FixtureTypes>(
        fixtureName: K
      ): Chainable<FixtureType[K]>;
    }
    interface Chainable<Subject = any> {
      typeLoginDta(email: string, password: string): void;
      getElement(element: string, options?: object): Chainable<HTMLElement>;
    }
  }
}
