import { ComponentName, useThemeContext } from '@components';

/**
 * HoC for setting pre-configured component default props retrieved from
 * the theme configuration file.
 */
export const withDefaultProps = <T,>(
  Component: React.FC<T>,
  componentName: ComponentName
) => {
  return (props: T & JSX.IntrinsicAttributes) => {
    const { getComponentDefaultProps } = useThemeContext();
    const defaultProps = getComponentDefaultProps(componentName);

    return <Component {...{ ...defaultProps, ...props }} />;
  };
};
