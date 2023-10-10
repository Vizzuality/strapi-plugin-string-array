import React, { useState } from 'react';
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
  const [arrayOfStrings, setArrayOfStrings] = useState(() => {
    return Array.isArray(value) ? value.join(',') : value;
  });

  const handleValueChange = (newValue) => {
    setArrayOfStrings(newValue);
    onChange({ target: { name, value: newValue, type: attribute.type } });
  }

    const label = intlLabel.id
        ? formatMessage(
            { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
            { ...intlLabel.values }
        )
        : name;

  return (
    <>
      <Textarea
        placeholder="Individual strings divided by commas"
        label={label}
        name={name}
        onChange={(e) => handleValueChange(e.target.value)}
      >
        {arrayOfStrings}
      </Textarea>
      {error &&
        <Typography variant="pi" textColor="danger600">
          {formatMessage({ id: error, defaultMessage: error })}
        </Typography>
      }
    </>
  )
}

export default Input;
