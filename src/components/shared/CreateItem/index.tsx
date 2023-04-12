import React, { useEffect } from 'react'
import styles from './CreateItem.module.scss'
import { Avatar } from '@mui/material';
import CustomCheck from '../CustomCheck';
import CustomRadio from '../CustomRadio';

interface CreateItemProps {
    content: string;
    avatar?: string;
    image_url?: string;
    value: string | number;
    values: any;
    type: 'radio'  | 'checkbox';
    setValue: Function;
    radioName?: string;
}

const CreateItem: React.FC<CreateItemProps> = ({content, avatar, value, values, setValue, type, radioName, image_url}) => {


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (type === 'radio') {
      setValue(value);
    } else if (checked) {
      setValue((prevValues: any[]) => [...prevValues, value]);
    } else {
      setValue((prevValues: any[]) => prevValues.filter((v: any) => v !== value));
    }
  }

  return (
    <li className={styles.item}>
        {avatar && !image_url && <Avatar>{avatar}</Avatar>}
        {image_url && <Avatar src={image_url} />}
        <p className={styles.value}>{content}</p>
        <div className={styles.check}>
        {type === 'radio' ? (
          <CustomRadio value={value} checked={value === values} name={radioName} onChange={handleChange} />
        ) : (
          <CustomCheck value={value} checked={values.includes(value)} onChange={handleChange} />
        )}
        </div>      
    </li>
  )
}

export default CreateItem