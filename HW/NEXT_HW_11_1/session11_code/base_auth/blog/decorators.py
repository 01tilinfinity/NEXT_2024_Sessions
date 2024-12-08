from django.utils import timezone
from django.shortcuts import get_object_or_404
from .models import Post

def track_post_view(view_func):
    def wrapper(request, *args, **kwargs):
        # Call the view function to get the response
        response = view_func(request, *args, **kwargs)
        
        # If the user is authenticated, track the post view
        if request.user.is_authenticated:
            # Get the post being viewed
            post = get_object_or_404(Post, pk=kwargs['post_pk'])
            # Store the user and current time as the latest viewer
            post.last_viewed_user = request.user
            post.last_viewed_time = timezone.now()
            post.save()
        
        return response
    return wrapper
