import { Switch } from 'antd';
import { SwitchChangeEventHandler } from 'antd/es/switch';

type CustomSwitchProps = {
  disabledText: string;
  enabledText: string;
  onChange: SwitchChangeEventHandler;
  checked: boolean;
};

export const CustomSwitch = ({ disabledText, enabledText, onChange, checked }: CustomSwitchProps) => {
  return (
    <>
      <span>{disabledText}</span>
      <Switch onChange={onChange} checked={checked} />
      <span>{enabledText}</span>
    </>
  );
};
