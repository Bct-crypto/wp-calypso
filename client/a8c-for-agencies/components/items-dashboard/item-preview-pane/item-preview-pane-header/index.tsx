import { Gridicon } from '@automattic/components';
import { Button } from '@wordpress/components';
import { useMediaQuery } from '@wordpress/compose';
import { Icon, external } from '@wordpress/icons';
import classNames from 'classnames';
import { translate } from 'i18n-calypso';
import SiteFavicon from '../../site-favicon';
import { ItemData } from '../types';

import './style.scss';

const ICON_SIZE = 24;

interface Props {
	closeItemPreviewPane?: () => void;
	itemData: ItemData;
	className?: string;
}

export default function ItemPreviewPaneHeader( {
	itemData,
	closeItemPreviewPane,
	className,
}: Props ) {
	const isLargerThan960px = useMediaQuery( '(min-width: 960px)' );
	const size = isLargerThan960px ? 64 : 50;

	return (
		<div className={ classNames( 'item-preview__header', className ) }>
			<div className="item-preview__header-content">
				<SiteFavicon
					blogId={ itemData.blogId }
					isDotcomSite={ itemData.isDotcomSite }
					color={ itemData.color }
					className="item-preview__header-favicon"
					size={ size }
				/>
				<div className="item-preview__header-title-summary">
					<div className="item-preview__header-title">{ itemData.title }</div>
					<div className="item-preview__header-summary">
						<Button
							variant="link"
							className="item-preview__header-summary-link"
							href={ itemData.url }
							target="_blank"
						>
							<span>{ itemData.subtitle }</span>
							<Icon className="sidebar-v2__external-icon" icon={ external } size={ ICON_SIZE } />
						</Button>
					</div>
				</div>
				<Button
					onClick={ closeItemPreviewPane }
					className="item-preview__close-preview"
					aria-label={ translate( 'Close Preview' ) }
				>
					<Gridicon icon="cross" size={ ICON_SIZE } />
				</Button>
			</div>
		</div>
	);
}
