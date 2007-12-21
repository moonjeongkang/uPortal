/* Copyright 2004 The JA-SIG Collaborative.  All rights reserved.
 * See license distributed with this file and
 * available online at http://www.uportal.org/license.html
 */
package org.jasig.portal.utils.cache;

import java.util.Map;

/**
 * Interface for a cache factory that returns a cache that externally acts like a map.
 * Underlying caches don't have to be a map, but they must be wrapped in the map interface
 * if they do not.
 *
 * @author Scott Battaglia
 * @version $Revision$ $Date$
 *
 */
public interface CacheFactory {

    /** The cache to be used to hold user information. */
    String USER_INFO_CACHE = "userInfoCache";

    /** The cache to be used to hold principals. */
    String PRINCIPAL_CACHE = "principalCache";

	/** The cache to be used to hold names. */
	String NAME_CACHE = "nameCache";

	/** The cache to be used to hold content. */
	String CONTENT_CACHE = "contentCache";

    /** Generic default cache that can be used for anything */
    String DEFAULT = "default";

    /**
     * Method to retrieve a cache by name.
     *
     * @param cacheName the name of the cache to retrieve.
     * @return the cache that is referenced by the cache name provided.
     * @throws IllegalArgumentException if a cache by that name cannot be retrieved.
     */
    Map getCache(String cacheName) throws IllegalArgumentException;

    /**
     * Method to retrieve a default cache without a name.
     * @return the default cache for this CacheFactory
     */
    Map getCache();
}