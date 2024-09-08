import React, { useState } from 'react'

/**
 * Input with number validation.
 *
 * @typedef {Object} InputNumberProps
 * @prop {String=} decimalSeparator
 * @prop {Boolean=} disabled
 * @prop {Number=} max
 * @prop {Number=} min
 * @prop {String=} placeholder
 * @prop {Function} setValue
 * @prop {Number=} value
 *
 * @param {InputNumberProps} props
 */

interface InputNumberProps {
  decimalSeparator?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
  placeholder?: string;
  setValue?: Function;
  value?: number;
}

export default function NumberInput({
  decimalSeparator = '.',
  disabled,
  max,
  min,
  placeholder,
  setValue,
  value
}: InputNumberProps) {
  const [editing, setEditing] = useState(false)
  const [currentValue, setCurrentValue] = useState(typeof value === 'number' ? String(value) : '')

  return (
    <input
      disabled={disabled}
      onBlur={() => {
        setEditing(false)

        let maybeNumber = parseFloat(currentValue)

        // Do nothing if value is not a number.
        if (isNaN(maybeNumber)) {
          return
        }

        // Apply lower threeshold if min is defined.
        if (typeof min === 'number') {
          maybeNumber = Math.max(min, maybeNumber)
        }

        // Apply upper threeshold if max is defined.
        if (typeof max === 'number') {
          maybeNumber = Math.min(max, maybeNumber)
        }

        if (typeof setValue === 'function') {
          setValue(maybeNumber)
        }
      }}
      onChange={(event) => {
        let maybeNumber = event.target.value

        // Force decimal separator.
        maybeNumber = maybeNumber.replace(',', decimalSeparator)

        // Avoid writing minus sign twice.
        maybeNumber = maybeNumber.replace('--', '-')

        // First character could me minus: keep it and remove all other minus signs.
        if (maybeNumber.length > 2) {
          maybeNumber = maybeNumber.charAt(0) + maybeNumber.substring(1).replace('-', '')
        }

        // If min is defined and positive, get rid off all minus signs.
        if (typeof min === 'number' && min >= 0) {
          maybeNumber = maybeNumber.replace('-', '')
        }

        // Avoid writing decimal separator twice.
        maybeNumber = maybeNumber.replace(`${decimalSeparator}${decimalSeparator}`, decimalSeparator)

        // Avoid duplicated decimal separator character.
        // If there is more then one decimal separator, keep only the first two parts.
        maybeNumber = maybeNumber.split(decimalSeparator).slice(0, 2).join(decimalSeparator)

        // Remove all characters except minus, decimal separator and numbers.
        maybeNumber = maybeNumber.replace(new RegExp(`[^-${decimalSeparator}\\d]`), '')

        setCurrentValue(maybeNumber)
      }}
      onFocus={() => {
        if (typeof value === 'number') {
          setCurrentValue(String(value))
        } else {
          setCurrentValue('')
        }

        setEditing(true)
      }}
      placeholder={placeholder}
      type='text'
      className='mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value={editing ? currentValue : (typeof value === 'undefined' ? '' : value)}
    />
  )
}
