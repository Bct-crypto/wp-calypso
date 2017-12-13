/** @format */
/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';
import { connect } from 'react-redux';
import { flow, get } from 'lodash';

/**
 * Internal dependencies
 */
import { getEditorPostId } from 'state/ui/editor/selectors';
import {
	getPostRevisions,
	getPostRevisionsComparisons,
	getPostRevisionsAuthorsId,
	getPostRevisionsSelectedRevisionId,
} from 'state/selectors';
import { getSelectedSiteId } from 'state/ui/selectors';
import EditorDiffViewer from 'post-editor/editor-diff-viewer';
import EditorRevisionsList from 'post-editor/editor-revisions-list';
import QueryPostRevisions from 'components/data/query-post-revisions';
import QueryUsers from 'components/data/query-users';

class EditorRevisions extends Component {
	render() {
		const {
			authorsIds,
			comparisons,
			postId,
			revisions,
			selectedDiff,
			selectedRevisionId,
			siteId,
		} = this.props;

		return (
			<div className="editor-revisions__wrapper">
				<QueryPostRevisions
					postId={ postId }
					siteId={ siteId }
					selectedRevisionId={ selectedRevisionId }
				/>
				<QueryUsers siteId={ siteId } userIds={ authorsIds } />
				<EditorDiffViewer
					diff={ selectedDiff }
					postId={ postId }
					selectedRevisionId={ selectedRevisionId }
					siteId={ siteId }
				/>
				<EditorRevisionsList
					comparisons={ comparisons }
					postId={ postId }
					revisions={ revisions }
					selectedRevisionId={ selectedRevisionId }
					siteId={ siteId }
				/>
			</div>
		);
	}
}

EditorRevisions.propTypes = {
	// connected
	authorsIds: PropTypes.array.isRequired,
	comparisons: PropTypes.object,
	postId: PropTypes.number.isRequired,
	revisions: PropTypes.array.isRequired,
	selectedDiff: PropTypes.object,
	selectedRevisionId: PropTypes.number,
	siteId: PropTypes.number.isRequired,

	// localize
	translate: PropTypes.func.isRequired,
};

export default flow(
	localize,
	connect( state => {
		const postId = getEditorPostId( state );
		const siteId = getSelectedSiteId( state );

		const revisions = getPostRevisions( state, siteId, postId );
		const selectedRevisionId = getPostRevisionsSelectedRevisionId( state );
		const comparisons = getPostRevisionsComparisons( state, siteId, postId );
		const selectedDiff = get( comparisons, [ selectedRevisionId, 'diff' ], {} );

		return {
			authorsIds: getPostRevisionsAuthorsId( state, siteId, postId ),
			comparisons,
			postId,
			revisions,
			selectedDiff,
			selectedRevisionId,
			siteId,
		};
	} )
)( EditorRevisions );
