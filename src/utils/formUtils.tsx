export interface SelectOption {
  label: string;
  value: string;
}

export const selectOptions = (options: SelectOption[]) => {
  return  options.map(item =>
    <option key={item.value} value={item.value}>{item.label}</option>
  );
};
