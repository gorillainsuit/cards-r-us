import React from 'react';
import AuthForm, { AuthAction, AuthFormProps, AuthProperty } from './AuthForm';

describe('<AuthForm />', () => {
  it('should render', () => {
    const authFormProps: AuthFormProps = {
      properties: [],
      actions: [],
      onSubmit: () => {},
    };

    cy.mount(<AuthForm {...authFormProps} />);
  });

  it('should handle form submissions', () => {
    const properties: AuthProperty[] = [];
    const actions: AuthAction[] = [
      {
        text: 'Submit',
        type: 'submit',
      },
    ];

    const obj = {
      onSubmit() {},
    };

    cy.spy(obj, 'onSubmit').as('onSubmit');

    cy.mount(
      <AuthForm
        properties={properties}
        actions={actions}
        onSubmit={obj.onSubmit}
      />
    );

    cy.get('button').contains('Submit').click();

    cy.get('@onSubmit').should('have.been.calledOnce');
  });

  it('should support non-form actions', () => {
    const properties: AuthProperty[] = [];
    const actions: AuthAction[] = [
      {
        text: 'Submit',
        type: 'submit',
      },
      {
        text: 'Link',
        type: 'link',
        to: '/link',
      },
    ];

    const obj = {
      onSubmit() {},
    };

    cy.spy(obj, 'onSubmit').as('onSubmit');

    const linkRoute = {
      path: '/link',
      element: <div>Link</div>,
    }

    cy.mount(
      <AuthForm
        properties={properties}
        actions={actions}
        onSubmit={obj.onSubmit}
      />, {
        additionalRoutes: [linkRoute],
      }
    );

    cy.get('a').contains('Link').click();
    cy.get('@onSubmit').should('not.have.been.called');
    cy.get('div').contains('Link');
  });

  it('should handle form submission with required and optional fields', () => {
    interface WrapperProps {
      onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    }

    const Wrapper: React.FC<WrapperProps> = ({ onSubmit }) => {
      const [requiredFieldValue, setRequiredFieldValue] = React.useState('');
      const [optionalFieldValue, setOptionalFieldValue] = React.useState('');

      return (
        <AuthForm
          properties={[
            {
              label: 'Required Field',
              name: 'required',
              type: 'text',
              value: requiredFieldValue,
              onChange: (e) => {
                setRequiredFieldValue(e.target.value);
              },
              required: true,
            },
            {
              label: 'Optional Field',
              name: 'optional',
              type: 'text',
              value: optionalFieldValue,
              onChange: (e) => {
                setOptionalFieldValue(e.target.value);
              },
            },
          ]}
          actions={[
            {
              text: 'Submit',
              type: 'submit',
            },
          ]}
          onSubmit={onSubmit}
        />
      );
    };

    const obj = {
      onSubmit() {},
    };

    cy.spy(obj, 'onSubmit').as('onSubmit');

    cy.mount(<Wrapper onSubmit={obj.onSubmit} />);

    cy.get('button').contains('Submit').click();
    cy.get('@onSubmit').should('not.have.been.called');

    cy.get('input[name="required"]').type('Hello');

    cy.get('button').contains('Submit').click();
    cy.get('@onSubmit').should('have.been.calledOnce');
  });
});
