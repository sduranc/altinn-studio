import type { HTMLAttributes } from 'react';
import React, { forwardRef, useId } from 'react';
import { Paragraph, Spinner } from '@digdir/designsystemet-react';
import type { SpinnerProps } from '@digdir/designsystemet-react';
import classes from './StudioSpinner.module.css';

export type StudioSpinnerProps = {
  spinnerTitle: string;
  showSpinnerTitle?: boolean;
  size?: SpinnerProps['size'];
  variant?: SpinnerProps['variant'];
} & HTMLAttributes<HTMLDivElement>;

type ParagraphSize = Exclude<SpinnerProps['size'], '2xs' | 'xxsmall' | 'l' | 'xl' | 'xlarge'>;

const convertSpinnerSizeToFittingParagraphSize = (
  spinnerSize: SpinnerProps['size'],
): ParagraphSize => {
  const spinnerSizeIsSmaller = spinnerSize === '2xs' || spinnerSize === 'xxsmall';
  const spinnerSizeIsBigger =
    spinnerSize === 'xl' || spinnerSize === 'lg' || spinnerSize === 'xlarge';
  return spinnerSizeIsSmaller ? 'xs' : spinnerSizeIsBigger ? 'md' : spinnerSize;
};

export const StudioSpinner = forwardRef<HTMLDivElement, StudioSpinnerProps>(
  (
    { spinnerTitle, showSpinnerTitle = false, size = 'medium', variant = 'interaction', ...rest },
    ref,
  ): JSX.Element => {
    const spinnerDescriptionId = useId();
    const paragraphSize: ParagraphSize = convertSpinnerSizeToFittingParagraphSize(size);

    return (
      <div className={classes.spinnerWrapper} ref={ref} {...rest}>
        <Spinner
          title={!showSpinnerTitle && spinnerTitle}
          size={size}
          variant={variant}
          aria-describedby={showSpinnerTitle ? spinnerDescriptionId : null}
          data-testid='studio-spinner-test-id'
        />
        {showSpinnerTitle && (
          <Paragraph size={paragraphSize} id={spinnerDescriptionId}>
            {spinnerTitle}
          </Paragraph>
        )}
      </div>
    );
  },
);

StudioSpinner.displayName = 'StudioSpinner';
