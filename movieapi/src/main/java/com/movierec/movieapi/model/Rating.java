package com.movierec.movieapi.model;
import jakarta.persistence.Table;
import jakarta.persistence.*;

@Entity
@Table(name = "ratings")
public class Rating {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne @JoinColumn(name = "movie_id")
  private Movie movie;

  private int score;  // 1–5

  public Rating() {}
  public Rating(User user, Movie movie, int score) {
    this.user = user;
    this.movie = movie;
    this.score = score;
  }
  // getters & setters…
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public User getUser() {
    return user;
  }
  public void setUser(User user) {
    this.user = user;
  }
  public Movie getMovie() {
    return movie;
  }
  public void setMovie(Movie movie) {
    this.movie = movie;
  }
  public int getScore() {
    return score;
  }
  public void setScore(int score) {
    this.score = score;
  }
  
}
