function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // Redirect mappings - check these FIRST before clean URLs
    var redirects = {
        '/enterprisejoinnowdiscount': '/enterprisejoinnowspecial/',
        '/enterprisejoinnowdiscount/': '/enterprisejoinnowspecial/',
        '/thankyouonboarding': '/activate/',
        '/thankyouonboarding/': '/activate/'
    };
    
    // Automatically add review folder versions of all redirects
    var reviewPrefix = '/review-3p9b584n12';
    for (var redirectPath in redirects) {
        redirects[reviewPrefix + redirectPath] = reviewPrefix + redirects[redirectPath];
    }
    
    // Check if URI matches a redirect (exact match)
    if (redirects[uri]) {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: redirects[uri] }
            }
        };
    }
    
    // Check if URI starts with a redirect path (for sub-paths)
    for (var redirectPath in redirects) {
        if (uri.startsWith(redirectPath + '/') || uri === redirectPath) {
            var targetPath = redirects[redirectPath];
            // Preserve the sub-path after the redirect path
            var subPath = uri.substring(redirectPath.length);
            return {
                statusCode: 301,
                statusDescription: 'Moved Permanently',
                headers: {
                    'location': { value: targetPath + subPath }
                }
            };
        }
    }
    
    // Clean URLs logic with trailing slash enforcement
    // 
    // WHY: Browsers resolve relative paths (like ../assets/css/base.css) differently based on 
    // whether the URL has a trailing slash or not:
    //   - /flipfixprofit    → browser treats "flipfixprofit" as a FILE, so ../ goes to root (/)
    //   - /flipfixprofit/   → browser treats "flipfixprofit" as a DIRECTORY, so ../ goes to parent
    // 
    // Without the trailing slash, ../assets/ resolves to /assets/ (production root) instead of
    // /review-3p9b584n12/assets/ (review folder), breaking CSS/fonts/images.
    //
    // SOLUTION: Redirect all directory URLs to include trailing slash BEFORE serving the file.
    // This ensures the browser knows the correct base path for relative URLs.
    
    // If URL has no trailing slash and no file extension → it's a directory path
    // Redirect to add trailing slash so browser resolves relative paths correctly
    if (!uri.endsWith("/") && !uri.includes(".")) {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: uri + '/' }
            }
        };
    }
    
    // If URL ends with "/" → serve index.html from that directory
    if (uri.endsWith("/")) {
        request.uri += "index.html";
    }
    
    return request;
}

