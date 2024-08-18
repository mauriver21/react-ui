import { Tooltip, TooltipProps } from '@components';
import { debounce } from '@utils';
import { CSSProperties, useCallback, useRef, useState } from 'react';

export interface WithTooltipProps {
  disabled?: boolean;
  disabledTitle?: string;
  title?: string;
  tooltipProps?: Omit<TooltipProps, 'title' | 'children'>;
  fullWidth?: boolean;
  rootStyle?: CSSProperties;
}

export const withTooltip = <T extends WithTooltipProps>(
  Component: React.FC<T>
) => {
  return (props: T & JSX.IntrinsicAttributes) => {
    const {
      title: titleProp,
      disabledTitle,
      disabled,
      tooltipProps,
      fullWidth,
      rootStyle,
      ...rest
    } = props;
    const store = useRef({ mouseEntered: false });
    const [open, setOpen] = useState(false);

    const showTooltip = useCallback(
      debounce(async () => {
        store.current.mouseEntered && setOpen(true);
      }, 200),
      []
    );

    const hideTooltip = () => setOpen(false);

    const title = () => {
      if (disabled && disabledTitle) return disabledTitle;
      if (disabled) return;
      return titleProp;
    };

    return (
      <Tooltip
        arrow
        placement="top"
        open={open}
        title={title()}
        {...tooltipProps}
      >
        <div
          onMouseEnter={() => {
            store.current.mouseEntered = true;
            showTooltip();
          }}
          onMouseLeave={() => {
            store.current.mouseEntered = false;
            hideTooltip();
          }}
          onClick={() => {
            store.current.mouseEntered = false;
            hideTooltip();
          }}
          style={{
            width: fullWidth ? '100%' : undefined,
            ...rootStyle,
          }}
        >
          <Component
            title={title()}
            fullWidth={fullWidth}
            disabled={disabled}
            {...(rest as T)}
          />
        </div>
      </Tooltip>
    );
  };
};
