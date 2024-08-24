import { ReactElement } from "react";
import {
  FieldValues,
  Path,
  Control,
  ControllerRenderProps,
  useController,
} from "react-hook-form";

export function ControlledInput<T extends FieldValues>(props: {
  name: Path<T>;
  control: Control<T>;
  renderItem: (props: ControllerRenderProps<T, Path<T>>) => ReactElement;
}) {
  const { field } = useController({
    control: props.control,
    name: props.name,
  });

  return props.renderItem(field);
}
