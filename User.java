import java.util.ArrayList;

public class User {
    private String username;
    private ArrayList<Movie> ratedMovies;

    // Constructor
    public User(String username) {
        this.username = username;
        this.ratedMovies = new ArrayList<>();
    }

    // Method to add a rated movie
    public void addMovie(Movie movie) {
        ratedMovies.add(movie);
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public ArrayList<Movie> getRatedMovies() {
        return ratedMovies;
    }
}
