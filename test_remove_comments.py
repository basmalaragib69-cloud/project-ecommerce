import os
import re

def remove_comments(text):
    # Regex to match strings (single, double, template) and comments
    # This pattern captures strings so we can ignore them, and captures comments to remove them.
    pattern = re.compile(
        r'("(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`|/\*[\s\S]*?\*/|(?<!:)//.*)',
        re.MULTILINE
    )
    
    def replacer(match):
        s = match.group(0)
        if s.startswith('/') or s.startswith('{'):
            # It's a comment
            return ""
        else:
            # It's a string, return it as is
            return s

    # Handle JSX comments first separately as they are wrapped in {}
    text = re.sub(r'\{\s*/\*[\s\S]*?\*/\s*\}', '', text)
    
    # Process the rest
    return pattern.sub(replacer, text)

# Test on a specific file first
test_file = r'd:\myProject\ecommerce\src\app\_components\WishlistBtn\WishlistBtn.tsx'
with open(test_file, 'r', encoding='utf-8') as f:
    content = f.read()

new_content = remove_comments(content)

with open(test_file + '.tmp', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Check d:\\myProject\\ecommerce\\src\\app\\_components\\WishlistBtn\\WishlistBtn.tsx.tmp")
