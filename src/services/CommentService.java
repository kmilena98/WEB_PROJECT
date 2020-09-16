package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;

import model.Apartments;
import model.Comments;
import model.Users;

@Path ("/komentari")
public class CommentService {

	
	@Context
	ServletContext ctx;
	
	@Context
	HttpServletRequest request;
	
	public CommentService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("apartments") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("apartments", new Apartments(contextPath));
		}
		if (ctx.getAttribute("users") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("users", new Users(contextPath));
		}
		if (ctx.getAttribute("comments") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("comments", new Comments(contextPath));
		}
	}
	
	
	
}
