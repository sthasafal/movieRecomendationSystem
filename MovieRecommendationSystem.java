import java.util.*;

public class MovieRecommendationSystem {

    // List of users
    private static List<User> users = new ArrayList<>();
    // List of movies
    private static List<Movie> movies = new ArrayList<>();

    public static void main(String[] args) {
        // Step 1: Load Data
        loadMovies();
        loadUsers();

        // Step 2: Ask for user login or registration (simple demo here)
        User currentUser = users.get(0); // Assume the first user for simplicity

        // Step 3: Display recommended movies
        List<Movie> recommendations = recommendMovies(currentUser);
        System.out.println("Recommended Movies for " + currentUser.getUsername() + ":");
        for (Movie movie : recommendations) {
            System.out.println(movie.getTitle() + " - Rating: " + movie.getRating());
        }
    }

    // Load sample movies
    private static void loadMovies() {
        movies.add(new Movie("The Dark Knight", "Action", 9.0));
        movies.add(new Movie("Inception", "Sci-Fi", 8.8));
        movies.add(new Movie("Titanic", "Romance", 7.8));
        movies.add(new Movie("The Matrix", "Action", 8.7));
    }

    // Load sample users
    private static void loadUsers() {
        User user1 = new User("Alice");
        user1.addMovie(movies.get(0)); // Alice rated The Dark Knight
        user1.addMovie(movies.get(1)); // Alice rated Inception

        User user2 = new User("Bob");
        user2.addMovie(movies.get(1)); // Bob rated Inception
        user2.addMovie(movies.get(2)); // Bob rated Titanic

        users.add(user1);
        users.add(user2);
    }

    // Movie recommendation logic based on simple common ratings
    private static List<Movie> recommendMovies(User currentUser) {
        List<Movie> recommendedMovies = new ArrayList<>();
        for (User user : users) {
            if (!user.getUsername().equals(currentUser.getUsername())) {
                for (Movie movie : user.getRatedMovies()) {
                    if (!currentUser.getRatedMovies().contains(movie)) {
                        recommendedMovies.add(movie);
                    }
                }
            }
        }
        return recommendedMovies;
    }
}
