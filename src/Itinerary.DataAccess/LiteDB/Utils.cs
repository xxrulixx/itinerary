﻿using System;
using System.Reflection;
using Itinerary.Common.Entities;

namespace Itinerary.DataAccess.LiteDB
{
  internal static class Utils
  {
    public static string GetCollectionName<TEntity>() where TEntity : EntityBase
    {
      string collectionName = typeof( TEntity ).GetTypeInfo().BaseType == typeof( object )
                                ? GetCollectioNameFromInterface<TEntity>()
                                : GetCollectionNameFromType( typeof( TEntity ) );

      if ( string.IsNullOrEmpty( collectionName ) )
      {
        throw new ArgumentException( "Collection name cannot be empty for this entity" );
      }
      return $"{collectionName.ToLower()}s";
    }

    private static string GetCollectioNameFromInterface<TEntity>()
    {
      return typeof( TEntity ).Name;
    }

    private static string GetCollectionNameFromType( Type entitytype )
    {
      if ( entitytype == null )
        throw new ArgumentNullException( nameof( entitytype ) );

      return GetBaseEntity( entitytype ).Name;
    }

    private static Type GetBaseEntity( Type entitytype )
    {
      if ( !typeof( EntityBase ).GetTypeInfo().IsAssignableFrom( entitytype ) )
        return entitytype;
      Type baseType = entitytype.GetTypeInfo().BaseType;
      if ( baseType == typeof( EntityBase ) )
        return entitytype;
      // No attribute found, get the basetype
      return GetBaseEntity( baseType );
    }
  }
}