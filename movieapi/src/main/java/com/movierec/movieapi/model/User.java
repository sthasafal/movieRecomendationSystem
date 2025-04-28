package com.movierec.movieapi.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String username;
  private String password;
  private String email;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private Set<Rating> ratings;

  public User() {}
  public User(String username, String password, String email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
  // getters & setters…
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public String getUsername() {
    return username;
  }
  public void setUsername(String username) {
    this.username = username;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public Set<Rating> getRatings() {
    return ratings;
  }
  public void setRatings(Set<Rating> ratings) {
    this.ratings = ratings;
  }
  
}
