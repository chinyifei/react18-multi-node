import React, { useState } from 'react';
import './index.css';
import { Checkbox, Typography } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
const CheckboxGroup = Checkbox.Group;

const GroupItem = (props) => {
  const { children, id, onClick, activeId } = props;
  const isActive = id === activeId;

  return (
    <GroupItemContainer isActive={isActive} onClick={onClick}>
      <Typography.Text
        ellipsis={{ tooltip: { getPopupContainer: () => document.body } }}
        className="text"
        key={id}
      >
        {children}
      </Typography.Text>
    </GroupItemContainer>
  );
};
const MemoizedGroupItem = React.memo(GroupItem);

const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log('checked = ', checkedValues);
};

const plainOptions = ['Apple', 'Pear', 'Orange'];

const App: React.FC = () => {
  const [list, setList] = useState(
    Array.from({ length: 900 }, (item, index) => ({
      id: index,
      name: `Item ${index}`,
    }))
  );
  const [selectGroup, setSelectGroup] = useState<number>(0);
  const [checkedList, setCheckedList] = useState([]);

  const onListChage = (list) => {
    setCheckedList(list);
  };

  return (
    <>
      <Checkbox.Group
        options={plainOptions}
        defaultValue={['Apple']}
        onChange={onChange}
      />
      <br />
      <div style={{ height: '90vh' }}>
        <GroupListContainer>
          <CheckboxGroup
            className="group-check"
            // value={checkedList}
            onChange={onListChage}
            style={{ width: '100%' }}
          >
            {list?.map((group) => (
              <div style={{ display: 'flex' }} key={group?.id}>
                <Checkbox value={group.id} className="group-check" />
                <MemoizedGroupItem
                  activeId={selectGroup}
                  id={group.id}
                  /**加了点击事件会更卡一点，感觉引用类型props会影响diff性能 */
                  onClick={() => {
                    setSelectGroup(group.id);
                  }}
                >
                  {group.name}
                </MemoizedGroupItem>
              </div>
            ))}
          </CheckboxGroup>
        </GroupListContainer>
      </div>
    </>
  );
};

export default App;

interface GroupItemContainerProps {
  isActive: boolean;
}

const GroupItemContainer = styled.div<GroupItemContainerProps>`
  height: 32px;
  border-radius: 4px;
  padding-left: 36px;
  margin-bottom: 4px;
  padding-right: 16px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? 'rgba(41, 115, 255, 0.06)' : 'transparent'};
  display: flex;
  align-items: center;
  .delete-icon {
    color: #999;
  }
  .text {
    line-height: 1.5;
    flex-grow: 1;
    width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover {
    background-color: rgba(41, 115, 255, 0.06);
    .delete-icon {
      display: inline-block;
    }
  }
`;

const GroupListContainer = styled(Scrollbars)`
  flex-grow: 1;
  height: 100px;
`;
