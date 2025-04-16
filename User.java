import java.util.ArrayList;
import java.util.List;

public class User {
    private String username;
    private List<Movie> ratedMovies;

    public User(String username) {
        this.username = username;
        this.ratedMovies = new ArrayList<>();
    }

    public void addMovie(Movie movie) {
        if (!ratedMovies.contains(movie)) {
            ratedMovies.add(movie);
        }
    }

    // Getters
    public String getUsername() { return username; }
    public List<Movie> getRatedMovies() { return ratedMovies; }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        User user = (User) obj;
        return username.equals(user.username);
    }
}