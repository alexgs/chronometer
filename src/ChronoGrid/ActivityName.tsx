import { CSSObject } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { EditableText } from 'src/Global/EditableText';
import { earthYellow, gunmetal, platinum, tints } from 'src/colors';
import { Activity } from 'types/activity';

import { ACTIVITY_LABEL_COL, HEADER_ROWS } from './constants';

const buttonCss: CSSObject = {
  color: tints.gunmetal[40],
  cursor: 'pointer',
};

const editableCss: CSSObject = {
  '& > span': {
    marginRight: '0.5rem',
  },
  '& > input': {
    backgroundColor: gunmetal,
    borderBottom: `1px solid ${earthYellow}`,
    color: platinum,
    marginRight: '0.5rem',
    ':focus': {
      outline: 'none',
    },
  },
};

interface Props {
  activity: Activity;
  onEdit: (activity: Activity) => void;
}

export const ActivityName: React.FunctionComponent<Props> = (props: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);

  function handleButtonClick(): void {
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
    display: 'flex',
    gridColumnStart: cssColumn,
    gridColumnEnd: cssColumn + 1,
    justifyContent: 'space-between',
    paddingRight: '1rem',
  };

  return (
    <div className={`gridcell row-${row}`} css={style}>
      <EditableText
        css={editableCss}
        isEditable={isEditing}
        onCancel={handleEditCancel}
        onSetText={handleEditSave}
        text={props.activity.name}
      />
      <FontAwesomeIcon
        css={buttonCss}
        icon={['far', 'pen']}
        onClick={handleButtonClick}
        role={'button'}
      />
    </div>
  );
};
ActivityName.displayName = 'ChronoGrid.ActivityName';
