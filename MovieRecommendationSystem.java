import java.util.*;
import java.util.stream.Collectors;

public class MovieRecommendationSystem {
    private static List<User> users = new ArrayList<>();
    private static List<Movie> movies = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        loadMovies();
        loadSampleUsers();

        System.out.println("Welcome to Movie Recommendation System!");
        
        User currentUser = handleUserAuthentication();
        
        if (currentUser != null) {
            showMainMenu(currentUser);
        }
    }

    private static User handleUserAuthentication() {
        System.out.println("1. Login");
        System.out.println("2. Register");
        System.out.print("Choose an option: ");
        int choice = scanner.nextInt();
        scanner.nextLine(); // consume newline

        if (choice == 1) {
            return loginUser();
        } else if (choice == 2) 
            return registerUser();
        } else {
            System.out.println("Invalid choice.");
            return null;
        }
    }

    private static User loginUser() {
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        
        for (User user : users) {
            if (user.getUsername().equals(username)) {
                System.out.println("Login successful!");
                return user;
            }
        }
        
        System.out.println("User not found.");
        return null;
    }

    private static User registerUser() {
        System.out.print("Enter new username: ");
        String username = scanner.nextLine();
        
        User newUser = new User(username);
        users.add(newUser);
        System.out.println("Registration successful!");
        return newUser;
    }

    private static void showMainMenu(User user) {
        while (true) {
            System.out.println("\nMain Menu");
            System.out.println("1. View Recommended Movies");
            System.out.println("2. Rate a Movie");
            System.out.println("3. View My Rated Movies");
            System.out.println("4. Exit");
            System.out.print("Choose an option: ");
            
            int choice = scanner.nextInt();
            scanner.nextLine(); // consume newline
            
            switch (choice) {
                case 1:
                    showRecommendedMovies(user);
                    break;
                case 2:
                    rateMovie(user);
                    break;
                case 3:
                    showUserRatings(user);
                    break;
                case 4:
                    System.out.println("Goodbye!");
                    return;
                default:
                    System.out.println("Invalid choice.");
            }
        }
    }

    private static void showRecommendedMovies(User user) {
        List<Movie> recommendations = recommendMovies(user);
        
        if (recommendations.isEmpty()) {
            System.out.println("No recommendations available. Try rating some movies first.");
            return;
        }
        
        System.out.println("\nRecommended Movies for " + user.getUsername() + ":");
        for (int i = 0; i < recommendations.size(); i++) {
            Movie movie = recommendations.get(i);
            System.out.printf("%d. %s - %s (Rating: %.1f)\n", 
                i+1, movie.getTitle(), movie.getGenre(), movie.getRating());
        }
    }

    private static void rateMovie(User user) {
        System.out.println("\nAvailable Movies:");
        for (int i = 0; i < movies.size(); i++) {
            Movie movie = movies.get(i);
            System.out.printf("%d. %s - %s\n", i+1, movie.getTitle(), movie.getGenre());
        }
        
        System.out.print("Select movie to rate (number): ");
        int movieChoice = scanner.nextInt();
        scanner.nextLine();
        
        if (movieChoice < 1 || movieChoice > movies.size()) {
            System.out.println("Invalid movie selection.");
            return;
        }
        
        Movie selectedMovie = movies.get(movieChoice - 1);
        
        System.out.print("Enter your rating (1-10): ");
        double rating = scanner.nextDouble();
        scanner.nextLine();
        
        if (rating < 1 || rating > 10) {
            System.out.println("Rating must be between 1 and 10.");
            return;
        }
        
        user.addMovie(selectedMovie);
        System.out.printf("You rated %s: %.1f\n", selectedMovie.getTitle(), rating);
    }

    private static void showUserRatings(User user) {
        List<Movie> ratedMovies = user.getRatedMovies();
        
        if (ratedMovies.isEmpty()) {
            System.out.println("You haven't rated any movies yet.");
            return;
        }
        
        System.out.println("\nYour Rated Movies:");
        for (Movie movie : ratedMovies) {
            System.out.printf("- %s - %s\n", movie.getTitle(), movie.getGenre());
        }
    }

    private static List<Movie> recommendMovies(User currentUser) {
        // Simple recommendation based on movies rated by other users but not by current user
        List<Movie> recommendedMovies = new ArrayList<>();
        
        for (User user : users) {
            if (!user.equals(currentUser)) {
                for (Movie movie : user.getRatedMovies()) {
                    if (!currentUser.getRatedMovies().contains(movie) && 
                        !recommendedMovies.contains(movie)) {
                        recommendedMovies.add(movie);
                    }
                }
            }
        }
        
        // Sort by rating (highest first)
        recommendedMovies.sort((m1, m2) -> Double.compare(m2.getRating(), m1.getRating()));
        
        return recommendedMovies;
    }

    private static void loadMovies() {
        movies.add(new Movie("The Dark Knight", "Action", 9.0));
        movies.add(new Movie("Inception", "Sci-Fi", 8.8));
        movies.add(new Movie("Titanic", "Romance", 7.8));
        movies.add(new Movie("The Matrix", "Action", 8.7));
        movies.add(new Movie("Pulp Fiction", "Crime", 8.9));
        movies.add(new Movie("Forrest Gump", "Drama", 8.8));
        movies.add(new Movie("The Shawshank Redemption", "Drama", 9.3));
    }

    private static void loadSampleUsers() {
        User user1 = new User("Alice");
        user1.addMovie(movies.get(0)); // The Dark Knight
        user1.addMovie(movies.get(1)); // Inception
        
        User user2 = new User("Bob");
        user2.addMovie(movies.get(1)); // Inception
        user2.addMovie(movies.get(2)); // Titanic
        user2.addMovie(movies.get(4)); // Pulp Fiction
        
        users.add(user1);
        users.add(user2);
    }
}