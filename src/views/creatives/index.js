import { useState } from "react";
import { useTitle } from "@providers/layout";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./requests";
import { searchableFields } from "@config/constants/users";
import CreativesList from "@components/creatives-list";

const pageSize = 10;

const Creatives = () => {
  useTitle("Creativos");
  const [fetchingMore, setFetchingMore] = useState(false);
  const [search, setSearch] = useState("");

  const variables = {
    search: {},
    params: {
      page: 1,
      pageSize,
    },
  };

  const { data, loading, fetchMore, refetch } = useQuery(GET_USERS, {
    variables,
    fetchPolicy: "cache-first",
  });

  const handleSearch = (event) => {
    event.preventDefault();
    refetch({
      ...variables,
      search: searchableFields.reduce((acc, curr) => {
        acc[curr] = search;
        return acc;
      }, {}),
    });
  };

  const handleNextPage = async () => {
    setFetchingMore(true);
    await fetchMore({
      variables: {
        params: {
          pageSize,
          page: data?.users.info.next,
        },
      },
    });
    setFetchingMore(false);
  };

  return (
    <CreativesList
      handleSearch={handleSearch}
      search={search}
      setSearch={setSearch}
      loading={loading}
      users={data?.users}
      fetchingMore={fetchingMore}
      handleNextPage={handleNextPage}
    />
  );
};

export default Creatives;
