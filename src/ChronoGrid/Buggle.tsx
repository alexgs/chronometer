import * as React from 'react';
import { Activity } from 'types/activity';

interface Props {
  activityId: Activity['id'];
  isChecked: boolean;
  onClick: (activityId: Activity['id'], timeCode: string) => void;
  timeCode: string;
}

// "Buggle" is a portmanteau of "bubble toggle." The Buggles were the first
// band ever played on MTV. The song was "Video Killed the Radio Star."
export const Buggle: React.FunctionComponent<Props> = (props: Props) => {
  function handleClick(event: React.SyntheticEvent<HTMLDivElement>): void {
    console.log(
      '[Buggle clicked]',
      props.activityId,
      ' | time code',
      props.timeCode,
    );

    const dataset = event.currentTarget.dataset;
    if (!dataset['activityId'] || !dataset['timeCode']) {
      console.error('Error with dataset', dataset);
      return;
    }
    props.onClick(props.activityId, props.timeCode);
  }

  const noOp = (): void => {
    /* no operation */
  };

  return (
    <div
      data-activity-id={props.activityId}
      data-time-code={props.timeCode}
      onClick={handleClick}
    >
      <input type={'checkbox'} checked={props.isChecked} onChange={noOp} />
    </div>
  );
};
Buggle.displayName = 'Buggle';
