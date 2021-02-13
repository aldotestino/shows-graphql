package com.aldotestino.showsgraphqlapi;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsData;
import com.netflix.graphql.dgs.InputArgument;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@DgsComponent
public class ShowsController {

  @Autowired
  ShowsService showsService;

  public ShowsController(ShowsService showsService) {
    this.showsService = showsService;
  }

  @DgsData(parentType = "Query", field = "shows")
  public List<Show> shows(@InputArgument("titleFilter") String titleFilter) {
    return showsService.getShows(titleFilter);
  }

  @DgsData(parentType = "Mutation", field = "addShow")
  public Show addShow(@InputArgument("title") String title,
                      @InputArgument("releaseYear") int releaseYear,
                      @InputArgument("posterUrl") String posterUrl) {
    return showsService.addShow(title, releaseYear, posterUrl);
  }

  @DgsData(parentType = "Mutation", field = "removeShow")
  public Show removeShow(@InputArgument("id") String id) {
    return showsService.removeShow(id);
  }
}
