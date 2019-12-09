import { ReactHTMLElement } from '../../node_modules/@types/react';
import * as React from 'react';
/**
 * FieldApi to simulate touched and error
 *
 * @interface FieldApi
 */
export interface FieldApi {
  touched: boolean;
  error: string | ReactHTMLElement<HTMLSpanElement> | undefined;
}

export interface ValidatorsInterface {
  fieldName: string;
  validators: Array<(value: string, touched: boolean, state?: any) => string>;
}

/**
 * State Validator
 *
 * @interface ValidatorState
 */
export interface ValidatorState {
  fields: { [key: string]: FieldApi };
}

export class ValidatorFactory {
  private _fields: { [key: string]: FieldApi } = {};
  private _validators: Array<ValidatorsInterface> = [];

  registerField = ( fieldName: string ) => {
    this._fields = { ...this._fields,
      [fieldName]: {touched: false, error: ''}
    };
  }
  getFieldState = () => {
    return this._fields;
  }
  registerFieldValidator = (
    fieldName: string,
    validator: (value: string, touched: boolean) => string
  ) => {
    let _newValidators: Array<ValidatorsInterface>  = [] ;
    let found: boolean = false;
    _newValidators = this._validators.map(
      (field) => {
          if (field.fieldName === fieldName) {
            found = true;
            field.validators.push(validator);
          }
          return field;
      }
    );
    if (!found) {
      _newValidators.push(
        {
          fieldName: fieldName,
          validators: [validator]
        }
      );
    }
    this._validators = _newValidators;
  }
  getValidators = () => {
    return this._validators;
  }

  validateField = (state: any, fieldName: string) => {
    let hasErrors: boolean = false;
    let fieldToValidate;
    fieldToValidate = this._validators.find(
      (v, i) => {
        return v.fieldName === fieldName;
      }
    );
    if (fieldToValidate && true ) {
      let errors: Array<string> = fieldToValidate.validators.map(
        (fun: (value: string, touched: boolean, state?: any) => string) => {
          let value = state[fieldName];
          return fun(value, state.fields[fieldName].touched, state);
        }
      ).filter( (err) => !(/^\s*$/).test(err) );
      if (errors.length > 0) {
        if ( errors.length === 1 ) {
          state.fields[fieldName].error = errors.join(' ');
        } else {
          state.fields[fieldName].error = (<span dangerouslySetInnerHTML={{ __html: errors.join('<br/>')}} />);
        }
        hasErrors = true;
      } else {
        state.fields[fieldName].error = '';
      }
    }

    return {
      hasErrors,
      newValidateFields: state.fields
    };
  }
  validateFields = (state: any) => {
    let hasErrors: boolean = false;
    if ( state.fields && true ) {
      this._validators.map(
        (valField) => {
          if (state.fields[valField.fieldName]) {
            let errors: Array<string> = valField.validators.map(
              (fun) => {
                let value = state[valField.fieldName];
                return fun(value, state.fields[valField.fieldName].touched, state);
              }
            ).filter((err) => (!(/^\s*$/).test(err)) );
            if (errors.length > 0) {
              if ( errors.length === 1 ) {
                state.fields[valField.fieldName].error = errors.join(' ');
              } else {
                state.fields[valField.fieldName].error =
                  (<span dangerouslySetInnerHTML={{ __html: errors.join('<br/>')}} />);
              }
              hasErrors = true;
            } else {
              state.fields[valField.fieldName].error = '';
            }
          }
        }
      );
    }
    return {
      hasErrors,
      newValidateFields: state.fields
    };
  }
}
