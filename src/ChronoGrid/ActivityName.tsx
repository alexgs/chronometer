import { CSSObject } from '@emotion/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import * as React from 'react';

import { EditableText } from 'src/Global/EditableText';
import { earthYellow, gunmetal, platinum, tints } from 'src/colors';
import { Activity } from 'types/activity';

import { ACTIVITY_LABEL_COL, HEADER_ROWS } from './constants';

const editableCss: CSSObject = {
  display: 'flex',
  justifyContent: 'space-between',
  '& > input': {
    backgroundColor: gunmetal,
    borderBottom: `1px solid ${earthYellow}`,
    color: platinum,
    marginRight: '0.5rem',
    ':focus': {
      outline: 'none',
    },
  },
  '& > span': {
    marginRight: '0.5rem',
  },
  '& > svg': {
    color: tints.gunmetal[40],
  },
};

interface Props {
  activity: Activity;
  onDelete: (activity: Activity) => void;
  onEdit: (activity: Activity) => void;
}

export const ActivityName: React.FunctionComponent<Props> = (props: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);

  function handleDeleteButtonClick(): void {
    props.onDelete(props.activity);
    setIsEditing(false);
  }

  function handleEditButtonClick(): void {
    setIsEditing(true);
  }

  function handleEditCancel(): void {
    setIsEditing(false);
  }

  function handleEditSave(activityName: string): void {
    const updatedActivity: Activity = {
      ...props.activity,
      name: activityName,
    };
    props.onEdit(updatedActivity);
    setIsEditing(false);
  }

  const cssColumn = ACTIVITY_LABEL_COL + 1;
  const row = props.activity.position + HEADER_ROWS;
  const style: CSSObject = {
    gridColumnStart: cssColumn,
    gridColumnEnd: cssColumn + 1,
    paddingRight: '1rem',
  };

  const iconClickHandler = isEditing
    ? handleDeleteButtonClick
    : handleEditButtonClick;
  const iconPath: IconProp = isEditing ? ['far', 'trash'] : ['far', 'pen'];

  return (
    <div className={`gridcell row-${row}`} css={style}>
      <EditableText
        css={editableCss}
        icon={iconPath}
        isEditable={isEditing}
        onCancel={handleEditCancel}
        onIconClick={iconClickHandler}
        onSetText={handleEditSave}
        text={props.activity.name}
      />
    </div>
  );
};
ActivityName.displayName = 'ChronoGrid.ActivityName';
