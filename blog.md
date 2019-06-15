---
layout: baseLayout
title: Blog Lisa
---
<div class="blog">
	<h1 class="header">Latest posts</h1>
		{% for post in site.posts %}
		<div class="blog_item">
				<h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
				<p>{{ post.excerpt }}</p>
		</div>
		{% endfor %}
</div>