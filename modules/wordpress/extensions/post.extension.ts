import { Post, PostSource, PostTypeSource } from '@codeserk/press-core'
import { PostEntity } from '@codeserk/press-graphql'
import { FieldResolver, Resolver, Root } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { sortByOrder } from '../../../utils/sort'

@Service()
@Resolver(() => PostEntity)
export class PostEntityExtension {
  @Inject(() => PostTypeSource)
  protected readonly postTypes!: PostTypeSource

  @Inject(() => PostSource)
  protected readonly source!: PostSource

  @FieldResolver(() => [PostEntity])
  async similar(@Root() post: PostEntity): Promise<Post[]> {
    const type = await this.postTypes.getById(post.typeId)
    if (!type) {
      return []
    }

    const otherPosts = (await this.source.getOfType(type)).filter(newPost => newPost.id !== post.id)
    const mainTerm = await this.source.getMainTerm(post)
    if (!mainTerm) {
      return otherPosts
    }

    const otherPostsWithCategory = await Promise.all(
      otherPosts.map(async otherPost => ({
        ...otherPost,
        mainTerm: await this.source.getMainTerm(otherPost),
      })),
    )

    return otherPostsWithCategory
      .filter(otherPost => otherPost.mainTerm && otherPost.mainTerm.id === mainTerm.id)
      .sort(sortByOrder)
  }
}
