import ReadyToSearch from "../../features/ReadyToSearch/ReadyToSearch";
import Loading from "../../features/Loading/Loading";
import SearchResults from "../../features/SearchResults/SearchResults";
import PropTypes from "prop-types";

const BottomPart = props => {

  if (props.loading) {
    return <Loading />
  } else {
    if (!props.success) {
      return <ReadyToSearch />
    } else {
      return <SearchResults />
    }
  }
}

BottomPart.propTypes = {
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
};

export default BottomPart;