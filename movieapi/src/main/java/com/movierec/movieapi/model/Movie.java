package com.movierec.movieapi.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "movies")

public class Movie {
  @Id
  private Long id;           // TMDb ID or any unique I
  private String title;
  private String genre;
  private String overview;
  private String posterPath;
  
  @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
  @JsonIgnore
  private Set<Rating> ratings;


  public Movie() {}
  public Movie(Long id, String title, String genre, String overview, String posterPath) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.overview = overview;
    this.posterPath = posterPath;
  }
  // …generate getters & setters here…
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getGenre() {
    return genre;
  }
  public void setGenre(String genre) {
    this.genre = genre;
  }
  public String getOverview() {
    return overview;
  }
  public void setOverview(String overview) {
    this.overview = overview;
  }
  public String getPosterPath() {
    return posterPath;
  }
  public void setPosterPath(String posterPath) {
    this.posterPath = posterPath;
  }
  public Set<Rating> getRatings() {
    return ratings;
  }
  public void setRatings(Set<Rating> ratings) {
    this.ratings = ratings;
  }
  
}
