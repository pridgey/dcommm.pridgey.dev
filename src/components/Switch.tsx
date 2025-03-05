import { Switch as KobalteSwitch } from "@kobalte/core";
import styles from "./Switch.module.css";

type SwitchProps = {
  OffLabel: string;
  OnLabel: string;
  OnChange: (isChecked: boolean) => void;
};

export const Switch = (props: SwitchProps) => {
  return (
    <KobalteSwitch.Root class={styles.root} onChange={props.OnChange}>
      <div class={styles.text}>
        <KobalteSwitch.Label class={styles.label}>
          {props.OffLabel}
        </KobalteSwitch.Label>
      </div>
      <KobalteSwitch.ErrorMessage />
      <KobalteSwitch.Input />
      <KobalteSwitch.Control class={styles.control}>
        <KobalteSwitch.Thumb class={styles.thumb} />
      </KobalteSwitch.Control>
      <KobalteSwitch.Label class={styles.label}>
        {props.OnLabel}
      </KobalteSwitch.Label>
    </KobalteSwitch.Root>
  );
};
