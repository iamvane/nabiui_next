import * as React from 'react';

interface Props {
  pageTitle: string;
}

/**
 * Page Title
 */
export const PageTitle =  (props: Props) => {
  return (
    <div className="nabi-text-center">
      <h2 id="nabi-text-uppercase">
        {props.pageTitle}
      </h2>
    </div>
  );
};

export default PageTitle;
