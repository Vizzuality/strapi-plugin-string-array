import * as React from 'react';
import { useIntl } from 'react-intl';
import { Textarea, Typography } from '@strapi/design-system';

const Input = ({
                 attribute,
                 error,
                 name,
                 onChange,
                 intlLabel,
                 value
               }) => {
  const { formatMessage } = useIntl();
  const separatorName = attribute?.options?.separator || 'comma';

  const handleChange = (e) => {
    onChange({
      target: { name, type: attribute.type, value: e.currentTarget.value },
    });
  };

  const label = intlLabel.id
    ? formatMessage(
      { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
      { ...intlLabel.values }
    )
    : name;


  const placeholder = `Individual strings divided by ${separatorName}s`

  return (
    <>
      <Textarea
        placeholder={placeholder}
        label={label}
        name={name}
        onChange={handleChange}
      >
        {value}
      </Textarea >
      {error &&
        <Typography variant="pi" textColor="danger600" >
          {formatMessage({ id: error, defaultMessage: error })}
        </Typography >
      }
    </>
  )
}

export default Input;
