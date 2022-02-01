## Ideas for functionality
# Searching Components
1. User sends an API request to search
    * Request searches database for the given keyword
    * Responds with a JSON array of all components matching the keyword
2. User selects a component from the given array (either "view details" or "compare")
    * No API requests needed
    * If view details, redirects to that component's details page
    * If compare, redirects to the compare page and adds that component to a table with the components being compared.
    
