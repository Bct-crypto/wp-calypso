import { useSelector } from 'calypso/state';
import {
	getPremiumThemePrice,
	getThemesForQueryIgnoringPage,
	isInstallingTheme,
	isThemeActive,
} from 'calypso/state/themes/selectors';
import { getSelectedSiteId } from 'calypso/state/ui/selectors';

export interface ThemesQuery {
	page: number;
	number: number;
	tier: string;
	filter: string;
	search: string;
	collection: string;
}

export function useThemeCollection( query: ThemesQuery ) {
	const themes = useSelector( ( state ) => getThemesForQueryIgnoringPage( state, 'wpcom', query ) );

	const siteId = useSelector( getSelectedSiteId );

	const isInstalling = useSelector(
		( state ) => ( themeId: string ) => isInstallingTheme( state, themeId, siteId as number )
	);

	const getPrice = useSelector(
		( state ) => ( themeId: string ) => getPremiumThemePrice( state, themeId, siteId as number )
	);
	const isActive = useSelector(
		( state ) => ( themeId: string ) => isThemeActive( state, themeId, siteId as number )
	);

	return { getPrice, themes, isActive, isInstalling, siteId };
}