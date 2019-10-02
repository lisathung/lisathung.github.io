---
layout: baseLayout
title: Blog Lisa
---
<!-- <h1 class="header">Latest posts</h1> -->
<div class="blog">
		{% for post in site.posts %}
		<a href="{{ post.url }}">
			<div class="blog_item">
					<h2 class="header">{{ post.title }}</h2>
					{{ post.excerpt | remove: '<p>' | remove: '</p>' }}
			</div>
		</a>
		{% endfor %}
</div>