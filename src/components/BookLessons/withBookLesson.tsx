import React from 'react';

export const WithBookLessons = (ChildComponent, name) => class extends React.Component<any>  {
  render () {
    return (
      <ChildComponent {...this.props} name={name} />
    )
  }
}
