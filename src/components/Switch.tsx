import { Switch as KobalteSwitch } from "@kobalte/core";
import styles from "./Switch.module.css";

type SwitchProps = {
  Description: string;
  Label: string;
  OnChange: (isChecked: boolean) => void;
};

export const Switch = (props: SwitchProps) => {
  return (
    <KobalteSwitch.Root class={styles.root} onChange={props.OnChange}>
      <div class={styles.text}>
        <KobalteSwitch.Label class={styles.label}>
          {props.Label}
        </KobalteSwitch.Label>
        <KobalteSwitch.Description class={styles.description}>
          {props.Description}
        </KobalteSwitch.Description>
      </div>
      <KobalteSwitch.ErrorMessage />
      <KobalteSwitch.Input />
      <KobalteSwitch.Control class={styles.control}>
        <KobalteSwitch.Thumb class={styles.thumb} />
      </KobalteSwitch.Control>
    </KobalteSwitch.Root>
  );
};
