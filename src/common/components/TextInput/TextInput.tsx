import styles from "./TextInput.module.scss";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
}

export const TextInput = ({
  label,
  leftIcon,
  id,
  className,
  ...rest
}: TextInputProps) => {
  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        <input
          id={id}
          className={`${styles.input} ${leftIcon ? styles.withIcon : ""}`}
          {...rest}
        />
      </div>
    </div>
  );
};
