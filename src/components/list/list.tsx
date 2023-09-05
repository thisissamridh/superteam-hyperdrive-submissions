import { useEffect, useState } from 'react';

import { initFilters } from '@/utils/filters';
import { projectDirectory } from '@/utils/getDatabase';
import type { Response } from '@/utils/responses';

import Card from './card';
import Filters from './filters';
import MobileFilters from './mobileFilters';
import Pagination from './pagination';
import Search from './search';

const getRecords = async () => {
  const listItems: Response[] = [];
  await projectDirectory.select().eachPage((records, fetchNextPage) => {
    records.forEach((record, index) => {
      listItems.push({
        order: index,
        projectTitle: record.get('Project Title') || null,
        description: record.get('Description') || null,
        tracks: record.get('Tracks') || null,
        demoLink: record.get('Twitter URL') || null,
        projectLink: record.get('Project Link') || null,
        githubUrl: record.get('GitHub URL') || null,
        superteam: record.get('Superteam') || null,
        logoUrl: record.get('LogoURL') || null,
        teamLead: record.get('Lead Name') || null,
        teamLeadTwitter: record.get('LeadTwitter') || null,
        helpWanted: record.get('Help wanted') || null,
      });
    });
    fetchNextPage();
  });
  return listItems;
};

const List = () => {
  const [responses, setResponses] = useState(Array<Response>);
  const [searchFilters, setSearchFilters] = useState({
    page: 0,
    searchText: '',
    filters: initFilters(responses),
  });
  useEffect(() => {
    getRecords()
      .then((records) => {
        setResponses(records);
        setSearchFilters({
          page: 0,
          searchText: '',
          filters: initFilters(records),
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const [filteredResponses, setFilteredResponses] = useState(
    responses.sort((a, b) =>
      a.projectTitle.toLowerCase() < b.projectTitle.toLowerCase() ? -1 : 1
    )
  );

  const [totalFilteredCount, setTotalFilteredCount] = useState(
    responses?.length
  );

  useEffect(() => {
    console.log(`Responses Length : ${responses.length}`);
    const searchedResponses = !searchFilters.searchText
      ? responses
      : responses.filter(
          (r) =>
            (r?.projectTitle || '')
              .toLowerCase()
              .indexOf(searchFilters.searchText.toLowerCase()) >= 0 ||
            (r?.description || '')
              .toLowerCase()
              .indexOf(searchFilters.searchText.toLowerCase()) >= 0 ||
            (r?.teamLead || '')
              .toLowerCase()
              .indexOf(searchFilters.searchText.toLowerCase()) >= 0
        );

    // Apply filters
    let finalResponses = [];

    const trueFilters = searchFilters.filters
      .map((f) => {
        const trueOptions = f.options.filter((o) => o.isSelected);
        if (trueOptions.length) {
          return {
            ...f,
            options: trueOptions,
          };
        }
        return null;
      })
      .filter((f) => !!f);
    if (!trueFilters.length) {
      const changedResponses = searchedResponses?.sort((a, b) =>
        a.projectTitle.toLowerCase() < b.projectTitle.toLowerCase() ? -1 : 1
      );
      finalResponses = changedResponses;
      // setFilteredResponses(changedResponses);
    } else {
      const trackOptions = trueFilters
        ?.find((tf) => tf?.id === 'track')
        ?.options?.map((o) => o.id);
      const superteamMemberOptions = trueFilters
        ?.find((tf) => tf?.id === 'superteamMember')
        ?.options?.map((o) => o.id);

      const changedResponses = searchedResponses
        ?.filter((r) => {
          const isTrack = trackOptions?.length
            ? !!trackOptions.find((t) => r?.tracks?.indexOf(t) >= 0)
            : true;
          const isSuperteamMember = superteamMemberOptions?.length
            ? !!superteamMemberOptions.find(
                (st) => r?.superteam?.indexOf(st) >= 0
              )
            : true;
          return isTrack && isSuperteamMember;
        })
        ?.sort((a, b) =>
          a.projectTitle.toLowerCase() < b.projectTitle.toLowerCase() ? -1 : 1
        );
      finalResponses = changedResponses;
      // setFilteredResponses(changedResponses);
    }

    // Apply pagination
    setTotalFilteredCount(finalResponses.length);
    // console.log('file: list.tsx:20 ~ List ~ page:', searchFilters.page);
    const from = searchFilters.page * 10;
    const to = searchFilters.page * 10 + 10;
    setFilteredResponses(finalResponses.slice(from, to));
  }, [searchFilters, responses]);

  return (
    <div className="w-full sm:px-8">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="relative w-full p-6 md:p-8">
          <div className="flex w-full justify-between gap-6 md:gap-8">
            <div className="w-full">
              <div className="w-full md:hidden">
                <MobileFilters
                  searchFilters={searchFilters}
                  setSearchFilters={setSearchFilters}
                />
              </div>
              <Search
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
                total={totalFilteredCount}
              />
              <ul className="">
                {filteredResponses.map((response) => (
                  <Card response={response} key={response.order} />
                ))}
              </ul>
              <Pagination
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
                total={totalFilteredCount}
              />
            </div>
            <div className="mt-1 hidden w-1/3 pt-12 md:block">
              <div className="rounded border border-zinc-700 bg-zinc-800 px-2 py-3 md:px-6 md:py-4">
                <Filters
                  searchFilters={searchFilters}
                  setSearchFilters={setSearchFilters}
                />
              </div>
              <p className="text-right text-xs italic text-zinc-600">
                Last updated on 2023-03-23 @ 11:15am IST
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
