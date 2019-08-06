import React, { useCallback, useState, useEffect, useRef } from 'react';
import Row from 'antd/lib/row';
import 'antd/lib/row/style/css';
import Col from 'antd/lib/col';
import 'antd/lib/col/style/css';
import Form, { FormComponentProps } from 'antd/lib/form';
import 'antd/lib/form/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';
import Typography from 'antd/lib/typography';
import 'antd/lib/typography/style/css';
import Switch from 'antd/lib/switch';
import 'antd/lib/switch/style/css';
import { editTask, removeTask } from 'state/actions';
import hasErrors from 'helpers/antForm/hasErrors';
import { Task as TaskType, Actions } from 'state/types';

interface Props extends FormComponentProps {
  dispatch: React.Dispatch<Actions>;
  task: TaskType;
}

const Task: React.FC<Props> = props => {
  const { dispatch, task, form } = props;

  const { id, desc, isFinished } = task;

  const {
    getFieldDecorator,
    getFieldsError,
    getFieldValue,
    validateFields
  } = form;

  const remove = useCallback(() => {
    dispatch(removeTask(id));
  }, [dispatch, id]);

  const changeStatus = useCallback(
    val => {
      dispatch(editTask({ id, isFinished: val }));
    },
    [dispatch, id]
  );

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<Input>(null);

  const switchEditMode = useCallback(
    () => setIsEditing(prevState => !prevState),
    [setIsEditing]
  );

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing, inputRef]);

  const changeDesc = useCallback(
    ev => {
      validateFields();

      const taskVal = getFieldValue('task');

      if (!taskVal) return;

      dispatch(editTask({ id, desc: taskVal }));

      const parentRowRelTarg =
        ev.relatedTarget && ev.relatedTarget.closest('.to-do-app__task-row');
      const parentRowCurTarg = ev.currentTarget.closest('.to-do-app__task-row');
      const isEditButton =
        !!ev.relatedTarget &&
        ev.relatedTarget.classList.contains('to-do-app__edit-button');

      if (parentRowRelTarg !== parentRowCurTarg) switchEditMode();
      if (!isEditButton && parentRowRelTarg === parentRowCurTarg)
        switchEditMode();
    },
    [id, dispatch, validateFields, getFieldValue, switchEditMode]
  );

  return (
    <Row className="to-do-app__task-row">
      <Col span={18}>
        <Form.Item>
          {isEditing ? (
            getFieldDecorator('task', {
              initialValue: desc,
              rules: [{ required: true, message: 'Введите описание задачи!' }]
            })(
              <Input
                ref={inputRef}
                onBlur={changeDesc}
                placeholder="Описание задачи"
              />
            )
          ) : (
            <Typography.Text delete={isFinished}>{desc}</Typography.Text>
          )}
        </Form.Item>
      </Col>
      <Col offset={1} span={1}>
        <Form.Item>
          {getFieldDecorator('isFinished', {
            initialValue: isFinished
          })(<Switch onChange={changeStatus} size="small" />)}
        </Form.Item>
      </Col>
      <Col offset={1} span={1}>
        <Form.Item>
          <Button
            className="to-do-app__edit-button"
            shape="circle"
            icon="edit"
            onClick={switchEditMode}
            disabled={hasErrors(getFieldsError())}
          />
        </Form.Item>
      </Col>
      <Col offset={1} span={1}>
        <Form.Item>
          <Button shape="circle" icon="delete" onClick={remove} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Form.create<Props>({ name: 'task' })(Task);
