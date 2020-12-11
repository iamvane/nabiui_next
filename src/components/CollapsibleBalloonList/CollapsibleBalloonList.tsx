import * as React from "react";
import { Link } from '@material-ui/core';

import { TextLinks } from "./constants";
import { capitalizeFirstLetter } from '../../utils/Strings'

/**
 * Display a maximum of five strings (mainList) inside balloons,
 * add a link for 'view more' (auxList), changing to 'view less' when its clicked)
 *
 * @param props: classForDiv, classForSpan, mainList, auxList
 */

const CollapsibleBalloonList: React.StatelessComponent<Props> = props => {
  const [collapsed, setCollapsed] = React.useState<any>(true);
  const displayMore = props.auxList && props.auxList.length;

  return (
    <div className={props.classForDiv}>
      {props.mainList?.map((item, i) =>
        <span key={i} className={props.classForSpan}>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
      )}
      { displayMore && collapsed ?
        <div><Link href='#' onClick={(ev) => {
          ev.preventDefault(); setCollapsed(false);
        }}>{ TextLinks.viewMore }</Link></div> : ''
      }
      { displayMore && !collapsed ?
        props.auxList?.map((item, i) => <span key={i} className={props.classForSpan}>{capitalizeFirstLetter(item)}</span>) : ''
      }
      { displayMore && !collapsed ?
        <div><Link href='#' onClick={(ev) => {
          ev.preventDefault(); setCollapsed(true);
        }}>{ TextLinks.viewLess }</Link></div> : ''
      }
    </div>
  )
}

export default CollapsibleBalloonList;
