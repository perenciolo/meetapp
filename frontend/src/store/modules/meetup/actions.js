export const getOrganizingRequest = () => ({
  type: '@meetup/GET_ORGANIZING_REQUEST',
});

export const getOrganizingSuccess = data => ({
  type: '@meetup/GET_ORGANIZING_SUCCESS',
  payload: { data },
});

export const detailMeetupById = id => ({
  type: '@meetup/DETAIL_MEETUP_BY_ID',
  payload: { id },
});

export const detailMeetupFailure = () => ({
  type: '@meetup/DETAIL_MEETUP_FAILURE',
});

export const uploadBannerRequest = bannerMetadata => ({
  type: '@meetup/UPLOAD_BANNER_REQUEST',
  payload: { bannerMetadata },
});
